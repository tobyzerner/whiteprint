export interface IComponent {
  view(vnode: any): any;
}

export abstract class AbstractComponent {
  public abstract view(vnode: any): any;
}
