import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap} from 'rxjs/operators';
import { NewsItem, NewsSource, createNewsItemFromSharePointResult } from '../model/news';
import { Observable, from } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  getNewsFromSources(sources: Array<NewsSource>): Promise<Array<NewsItem>> {

    const newsItems = Array<NewsItem>();
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose'
      })
    };
    // Filter on approved (published) items
    const approvedFilter = 'OData__ModerationStatus eq 0';

    // Request news from each of the sources, compile results into the newsItems array
    // When complete, resolve the promise
    return new Promise<Array<NewsItem>>((resolve) => {
      const startISO = moment().startOf('day').add(-4, 'month').toISOString();
      const getNewsFromSourceObservable = source => {
        const expiresFilter = source.type === 'announcements' ? ` and Expires ge datetime'${moment().toISOString()}'` : '';
        return this.httpClient.get(source.webURL + `/_api/web/lists/GetByTitle('${source.listName}')/Items?` +
        `$filter=${approvedFilter} and ${source.dateField} ge dateTime'${startISO}'${expiresFilter}`, httpOptions);
      };
      from(sources).pipe(mergeMap(source => getNewsFromSourceObservable(source), (sourceItem, observableItem) => {
        return {
          sourceItem: sourceItem,
          resultSet: observableItem
        };
      })).subscribe({
          next: val => {
            for (const result of val.resultSet['d']['results']) {
              const newsItem: NewsItem = createNewsItemFromSharePointResult(result, val.sourceItem as NewsSource);
              newsItems.push(newsItem);
            }
          },
          complete: () => resolve(newsItems)
      });
    });
  }
}