import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {ProfileInterface} from "../../../types/profile.interface";
import {GetUserProfileResponseInterface} from "../../../../userProfile/types/getUserProfileResponse.interface";
import {map} from "rxjs/operators";

@Injectable()
export class FollowUserService {
  fullUrl: string;

  constructor(private http: HttpClient) {
  }

  private getFullUrl(slug: string): string {
    this.fullUrl = `${environment.apiUrl}/profiles/${slug}/follow`;
    return this.fullUrl;
  }

  addToFollowing(slug: string): Observable<ProfileInterface> {
    const fullUrl = this.getFullUrl(slug);
    return this.http.post<GetUserProfileResponseInterface>(fullUrl, {})
      .pipe(
        map((res: GetUserProfileResponseInterface) => res.profile)
      )
  }

  removeFromFollowing(slug: string): Observable<ProfileInterface> {
    const fullUrl = this.getFullUrl(slug);
    return this.http.delete<GetUserProfileResponseInterface>(fullUrl, {})
      .pipe(
        map((res: GetUserProfileResponseInterface) => res.profile)
      )
  }
}
