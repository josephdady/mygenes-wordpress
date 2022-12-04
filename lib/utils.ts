export const relativePath = (path: string) => {
  const pathArray = path.split('/');
  const pathArrayLength = pathArray.length;
  const relativePath = pathArray[pathArrayLength - 2];
  return `/${relativePath}`;
};

export const replaceTextColor = (text: string, color: string): string => {
  const regex = /\^\[(.+\n*.*)\]\$/;
  return text.replace(regex, `<span style="color:${color}">$1</span>`);
};

export const insertBreakLine = (text: string): string => {
  const regex = new RegExp(/\\n/, 'gm');
  return text.replace(regex, `<br class="break-desktop"/>`);
};

export const extarctItemFromTranslations = (translations: any[]) => {
  let arr: any = [];
  translations.map((item: any) => {
    arr.push(item.translation);
  });
  return arr;
};
