import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from '../providers/configProvider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpListService {

  constructor(private httpClient: HttpClient) { }

  getListItems(listWeb: string, listName: string, order?: string, filter?: string, rowLimit?: number): Observable<Object>  {
    let reqUrl = `${listWeb}/_api/web/lists/getByTitle('${listName}')/items`;
    reqUrl += order || filter || rowLimit ? '?' : '';
    if (order) {
      reqUrl += '&$orderby=' + order;
    }
    if (filter) {
      reqUrl += order ? '&' : '';
      reqUrl += '&$filter=' + filter;
    }
    if (rowLimit) {
      reqUrl += order || filter ? '&' : '';
      reqUrl += '&$top=' + rowLimit;
    }
    console.log('sp-list.service query',reqUrl, ConfigProvider.spGetHttpOptions());
    return this.httpClient.get(reqUrl, ConfigProvider.spGetHttpOptions());
  }

  getListItemsCamlQuery(listWeb: string, listName: string, camlQuery: string, requestDigest: string): Observable<Object>  {
    const reqUrl = `${listWeb}/_api/web/lists/getByTitle('${listName}')/GetItems(query=@v1)?@v1=${camlQuery}`;
    return this.httpClient.post(reqUrl, '{}', ConfigProvider.spPostHttpOptions(requestDigest));
  }

  getView(listWeb: string, listName: string, viewGuid: string): Observable<Object>  {
    return this.httpClient.get(`${listWeb}/_api/web/lists/getByTitle('${listName}')/views(guid'${viewGuid}')`,
      ConfigProvider.spGetHttpOptions());
  }

  getDocuments(listWeb: string, folderPath: string): Observable<Object>  {
    return this.httpClient.get(`${listWeb}/_api/web/getFolderByServerRelativeUrl('${folderPath}')/files`,
      ConfigProvider.spGetHttpOptions());
  }

  getContextInfo(listWeb: string): Observable<Object> {
    return this.httpClient.post(`${listWeb}/_api/contextinfo`, '{}', ConfigProvider.spGetHttpOptions());
  }
}
