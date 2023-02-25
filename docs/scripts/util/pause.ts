export async function pause(timeout: number) {
  return new Promise((resolve) => {
    console.log(`Pausing for ${timeout}`);
    setTimeout(() => {
      resolve(timeout);
    }, timeout);
  });
}
