import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customsort',
})
export class CustomSort implements PipeTransform {
  transform(options: any, criteria: string | string[]): any {
    // if options is not array then return options
    if (!Array.isArray(options)) return options; 

    const criterias = Array.isArray(criteria) ? criteria : [criteria];

    //condition added for arrays without objects
    if (typeof options[0] !== 'object') {
    return [...options].sort((a, b) => a - b); 
    }

    return [...options].sort((a, b) => {
      for (let criteria of criterias) {
        // added for order of sorting descending
        const desc = criteria.startsWith('-');
        //extract the actual column name
        const actualCriteria = desc ? criteria.substring(1) : criteria;

        let aVal = this.extractValue(a, actualCriteria);
        let bVal = this.extractValue(b, actualCriteria);
        const comparison = this.compareOptions(aVal, bVal);
        if (comparison != 0) {
          return desc ? -comparison : comparison;
        }
      }
      return 0;
    });
  }

  private extractValue(obj: any, key: string) {
    return key.split('.').reduce((acc, part) => acc?.[part], obj);
  }

  private compareOptions(a: any, b: any) {
    if (a == null && b == null) return 0;
    if (a == null) return -1;
    if (b == null) return 1;
    if (a === b) return 0;
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length - b.length;
    }
    if (typeof a === 'boolean' && typeof b === 'boolean') {
      return Number(a) - Number(b);
    }

    if (typeof a == 'number' && typeof b == 'number') return a - b;

    if (typeof a == 'string' && typeof b == 'string') return a.localeCompare(b);

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }
    return String(a).localeCompare(String(b));
  }
}
