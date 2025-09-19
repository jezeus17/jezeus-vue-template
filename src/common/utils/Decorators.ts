import "reflect-metadata";
export function ID(target: object, propertyKey: string) {
  Reflect.defineMetadata("fieldAsID", true, target, propertyKey);
}
export function LogicErase(target: object, propertyKey: string) {
  Reflect.defineMetadata("fieldAsActive", true, target, propertyKey);
}
export function NotSavable(target: object, propertyKey: string) {
  Reflect.defineMetadata("notSavableField", true, target, propertyKey);
}
export function NotSearchable(target: object, propertyKey: string) {
  Reflect.defineMetadata("notSearchableField", true, target, propertyKey);
}
