import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  get_address_by_location(lng:any , lat:any){
/*    return this.http.get('https://api.neshan.org/v5/reverse',{
      params:{lat:lat, lng:lng},
      headers:{'Api-Key':'service.4d372ff24c1b4902a6b42f1a98d8d2d9'}
    })*/
    return this.http.get('https://map.ir/reverse',{
      params:{lat:lat, lon:lng},
      headers:{'x-api-key':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA2NDEyYzg5ZjY0ZjFmMjcxZWUyYzNjOWE4NzIxOGZiMjRhNWZmNmFlMDUzNDk5YWM2ZTMzNWU2YmM0ZTM3NTc1NWFmMmU1MjI0N2NmODU1In0.eyJhdWQiOiIyNDMyMCIsImp0aSI6IjA2NDEyYzg5ZjY0ZjFmMjcxZWUyYzNjOWE4NzIxOGZiMjRhNWZmNmFlMDUzNDk5YWM2ZTMzNWU2YmM0ZTM3NTc1NWFmMmU1MjI0N2NmODU1IiwiaWF0IjoxNjk2MTMzMTQ4LCJuYmYiOjE2OTYxMzMxNDgsImV4cCI6MTY5ODYzODc0OCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.X0eNWc0usMZZXn2SAvBv7K_GBwnQH0qh7GhmqyHX5s-diD0HchOwZjAJw_NafV5bX_qIt32RUxPQaiRnhXs2NwlPqUAUwA9jN7UxT5xf5zNHzJrOa1SqvlTrcmpJypcgfMPlMr8Zt-K3PYiICEGgBsqa8lfRywD6BQd-iZ3jCeifuFzDYimWj2xXhaNejA2ZhXYRfqy87zFId1YRYq0SBH4f-HekJbmzZE9gxDciHf89XunXvZlCyZY1yopE7Uo6x6bjEmvpe7OfINqi-a11ZrGUSfWZztflvenjA4r2qd2VH4YQ1MZBhNJYJNwiBWz2NPvcJJRZO_rKGlSVCthdMQ',
        'content-type': 'application/json'
      }
    })
  }

  get_location_by_address(address:any){
       return this.http.get('https://api.neshan.org/v4/geocoding',{
          params:{address:address},
          headers:{'Api-Key':'service.4d372ff24c1b4902a6b42f1a98d8d2d9'}
        })
  }

}
