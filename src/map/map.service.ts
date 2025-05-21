import axios from "axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MapService {
  private readonly apiKey = process.env.KAKAO_MAP_KEY;

  async getCoordinates(address: string): Promise<{ lat: number; lng: number }> {
    const { data } = await axios.get(
      'https://dapi.kakao.com/v2/local/search/address.json',
      {
        params: { query: address },
        headers: { Authorization: `KakaoAK ${this.apiKey}` }
      }
    );
    
    return {
      lat: parseFloat(data.documents[0].y),
      lng: parseFloat(data.documents[0].x)
    };
  }
}