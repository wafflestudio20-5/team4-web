declare module '*.module.css' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module "*.svg" {
  const content: any;
  export default content;
}
