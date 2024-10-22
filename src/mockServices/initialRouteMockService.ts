export default function initialRouteMockService(name: string, path: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function invoke(to: any, from: any, next: any) {
    if (!to.fullPath.includes(name)) {
      next({ path: path, replace: true });
    } else {
      next();
    }
  }

  return {
    invoke,
  };
}
