// src/app/shared/pipes/highlight.pipe.ts
import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(
    value: string | null | undefined,
    args: string | null | undefined,
  ): SafeHtml {
    if (!args || !value) {
      return this.sanitizer.sanitize(SecurityContext.HTML, value || '') || '';
    }
    if (args && value) {
      const startIndex = value.toLowerCase().indexOf(args.toLowerCase());
      if (startIndex !== -1) {
        const matchingString = value.substring(
          startIndex,
          startIndex + args.length,
        );
        const highlighted = value.replace(
          matchingString,
          `<span class="bg-yellow-200 font-bold">${matchingString}</span>`,
        );

        return this.sanitizer.bypassSecurityTrustHtml(highlighted);
      } else {
        return this.sanitizer.sanitize(SecurityContext.HTML, value) || '';
      }
    } else {
      return this.sanitizer.sanitize(SecurityContext.HTML, value || '') || '';
    }
  }
}
