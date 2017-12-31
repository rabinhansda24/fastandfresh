import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private URL = 'http://fastandfresh.org/api/';
  apiURL : string;
  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello RestProvider Provider');
  }

  getCategories() : Observable<{}> {
    this.apiURL = this.URL.concat('getCategories.php');
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getCategory(cid): Observable<{}> {
    var uri = 'getCategory.php?cid=';
    var newurl = uri.concat(cid);
    this.apiURL = this.URL.concat(newurl);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getVegItems(cid): Observable<{ }> {
    var uri = 'getVegItems.php?cid=';
    var newurl = uri.concat(cid);

    this.apiURL = this.URL.concat(newurl);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  getNonvegItems(cid): Observable<{}> {
    var uri = 'getNonvegItems.php?cid=';
    var newurl = uri.concat(cid);
    this.apiURL = this.URL.concat(newurl);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  getLastOrderId(): Observable<{}> {
    var uri = 'getLastOrder.php';
    this.apiURL = this.URL.concat(uri);
    console.log(this.apiURL);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getCartCount(email): Observable<{}> {
    var uri = 'getCartCount.php?email=';

    console.log("Email" + email);
    var newurl = uri.concat(email);
    this.apiURL = this.URL.concat(newurl);
    console.log(this.apiURL);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  getOrdersCount(email): Observable<{}> {
    var uri = 'getOrdersCount.php?email=';

    console.log("Email" + email);
    var newurl = uri.concat(email);
    this.apiURL = this.URL.concat(newurl);
    console.log(this.apiURL);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  deleteCart(email): Observable<{}> {
    var uri = 'deleteCart.php?email=';

    console.log("Email" + email);
    var newurl = uri.concat(email);
    this.apiURL = this.URL.concat(newurl);
    console.log(this.apiURL);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getCart(email): Observable<{}> {
    var uri = 'getCart.php?email=';
    var newurl = uri.concat(email);
    this.apiURL = this.URL.concat(newurl);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  getOrder(email): Observable<{}> {
    var uri = 'getOrders.php?email=';
    var newurl = uri.concat(email);
    this.apiURL = this.URL.concat(newurl);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  getOrderDetails(orderid) {
    var uri = 'getOrderDetails.php?orderid=';
    var newurl = uri.concat(orderid);
    this.apiURL = this.URL.concat(newurl);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getTotalAmount(email): Observable<{}> {
    var uri = 'getTotalAmount.php?email=';
    var newurl = uri.concat(email);
    this.apiURL = this.URL.concat(newurl);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  getOrderStatus(orderid) {
    console.log('rest:'+orderid);
    var uri = 'getOrderStatus.php?orderid=';
    var newurl = uri.concat(orderid);
    this.apiURL = this.URL.concat(newurl);
    console.log('apiURL:'+this.apiURL);
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response | any) {
    let body = res;
    console.log('body:'+body);
    return body || { };
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if(error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} $err`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
