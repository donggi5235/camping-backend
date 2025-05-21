import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class NotificationService {
  private readonly kakaoKey = process.env.KAKAO_API_KEY;

  async sendReservationConfirm(phone: string, info: ReservationInfoDto) {
    const url = 'https://kapi.kakao.com/v2/api/talk/memo/default/send';
    const template = {
      object_type: 'text',
      text: `[${info.campsiteName}] 예약 완료\n날짜: ${info.date}`,
      link: { web_url: 'https://your-site.com/reservations' }
    };

    await axios.post(url, { template_object: template }, {
      headers: {
        Authorization: `Bearer ${this.kakaoKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}