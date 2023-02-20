import { exec } from 'child_process';
import { sitePaths } from '../src/data/sitePaths';

// sitePaths.slice(8, 9).forEach(async (path, idx) => {
//   exec(
//     `node --require esbuild-register ./scripts/link-checker-pupperteer.ts ${path} ${idx}`,
//     (err, stdout, stderr) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log(stdout);
//     }
//   );
// });

async function runArrayPromiseInOrder(arr: unknown[], fn) {
  for (const [i, item] of arr.entries()) {
    await fn(item, i);
  }
}

runArrayPromiseInOrder(sitePaths, async (path, idx) => {
  exec(
    `node --require esbuild-register ./scripts/link-checker-pupperteer.ts ${path} ${idx}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    }
  );
});
