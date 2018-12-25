import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'withKeys',
  pure: false
})
export class WithKeysPipe implements PipeTransform {
  transform(value: any) {
    let keys = [];
    for (let key in value) {
      keys.push({key, value: value[key]});
    }
    return keys;
  }
}
