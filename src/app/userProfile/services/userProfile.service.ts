import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfileInterface} from "../../shared/types/profile.interface";
import {environment} from "../../../environments/environment";
import {GetUserProfileResponseInterface} from "../types/getUserProfileResponse.interface";
import {map} from "rxjs/operators";

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {
  }

  getUserProfile(slug: string): Observable<ProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}`;
    return this.http.get<GetUserProfileResponseInterface>(url)
      .pipe(
        map((response: GetUserProfileResponseInterface) => response.profile)
      )
  }
}
