import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the CanRateFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'canRateFilter',
})
export class CanRateFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(conversations: Array<any>) {
    return conversations.filter((conversation) => {
      return conversation.with.canRate;
    }).pop();
  }
}
