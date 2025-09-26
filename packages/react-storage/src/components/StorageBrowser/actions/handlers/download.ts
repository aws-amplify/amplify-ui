import {
  DownloadHandlerInput,
  DownloadHandlerOutput,
} from "@aws-amplify/ui-react-storage/browser";
import { getUrl } from "@aws-amplify/storage/internals";
import {
  ZipWriterAddDataOptions,
  ZipWriter,
  BlobWriter,
  BlobReader,
} from "@zip.js/zip.js";

const model = (() => {
  let zipWriter: ZipWriter<Blob> | null;
  return {
    addFile(file: Blob, name: string, options: ZipWriterAddDataOptions) {
      if (!zipWriter) {
        zipWriter = new ZipWriter(new BlobWriter("application/zip"), {
          bufferedWrite: true,
        });
      }
      return zipWriter.add(name, new BlobReader(file), options);
    },
    async getBlobURL() {
      if (zipWriter) {
        const blobURL = URL.createObjectURL(await zipWriter.close());
        zipWriter = null;
        return blobURL;
      } else {
        throw new Error("Zip file closed");
      }
    },
  };
})();

const constructBucket = ({
  bucket: bucketName,
  region,
}: DownloadHandlerInput["config"]) => ({ bucketName, region });

const download = async ({ config, data: { key } }: DownloadHandlerInput) => {
  const { customEndpoint, credentials, accountId } = config;
  const { url } = await getUrl({
    path: key,
    options: {
      bucket: constructBucket(config),
      customEndpoint,
      locationCredentialsProvider: credentials,
      validateObjectExistence: true,
      contentDisposition: "attachment",
      expectedBucketOwner: accountId,
    },
  });
  const response = await fetch(url, { mode: "cors" });
  const blob = await response.blob();
  const [filename] = key.split("/").reverse();
  await model.addFile(blob, filename, {});
};

const customDownloadHandler = (() => {
  const q = new Set<string>();
  let timer: ReturnType<typeof setTimeout>;
  return (input: DownloadHandlerInput): DownloadHandlerOutput => {
    const {
      data: { key },
    } = input;
    const [, folder] = key.split("/").reverse();
    q.add(key);
    const result = download(input)
      .then(() => {
        q.delete(key);
        return {
          status: "COMPLETE",
        };
      })
      .catch((e) => {
        const error = e as Error;
        q.delete(key);
        return {
          status: "FAILED",
          message: error.message,
          error,
        };
      })
      .finally(() => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          if (q.size === 0) {
            model.getBlobURL().then((blobURL) => {
              if (blobURL) {
                const anchor = document.createElement("a");
                const clickEvent = new MouseEvent("click");
                anchor.href = blobURL;
                anchor.download = `${folder || "archive"}.zip`;
                anchor.dispatchEvent(clickEvent);
              }
            });
          }
        }, 250);
      });
    return { result: result as DownloadHandlerOutput["result"] };
  };
})();

export { customDownloadHandler };
