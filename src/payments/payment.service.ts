import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class PaymentService {
  private readonly impKey = process.env.IMP_KEY;
  private readonly impSecret = process.env.IMP_SECRET;

  constructor(private httpService: HttpService) {}

  async verifyPayment(impUid: string): Promise<boolean> {
    const token = await this.getPaymentToken();
    const { data } = await this.httpService.get(
      `https://api.iamport.kr/payments/${impUid}`,
      { headers: { Authorization: token } }
    ).toPromise();
    
    return data.response.status === 'paid';
  }

  private async getPaymentToken(): Promise<string> {
    const { data } = await this.httpService.post(
      'https://api.iamport.kr/users/getToken',
      { imp_key: this.impKey, imp_secret: this.impSecret }
    ).toPromise();
    
    return data.response.access_token;
  }
}