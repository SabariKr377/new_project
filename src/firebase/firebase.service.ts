import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'

@Injectable()
export class FirebaseService {
   async  VerifyToken(token : string){
        const decodedIdToken = await admin.auth().verifyIdToken(token);
        return decodedIdToken
    }
}
