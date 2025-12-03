import "reflect-metadata";
import type { BaseModel } from "../models/base/BaseModel";
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
export function Unique(target: object, propertyKey: string) {
  Reflect.defineMetadata("uniqueField", true, target, propertyKey);
}
export function Label(target: object, propertyKey: string) {
  Reflect.defineMetadata("fieldAsLabel", true, target, propertyKey);
}
export function ForeignKey<T extends BaseModel>(targetClass: new (...args: any[]) => T) {
  return function (target: object, propertyKey: string) {
    Reflect.defineMetadata(
      'design:type',
      targetClass,
      target,
      propertyKey
    );

    Reflect.defineMetadata(
      'isForeignKey',
      true,
      target,
      propertyKey
    );
  };
}