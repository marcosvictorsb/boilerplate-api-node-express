import { TokenService } from "../../services/token.service";
import { LoggerMixin } from "../../services";
import { EncryptionService } from "../../services/encryption.service";

class BaseGateway { constructor(...args: any[]) {} }
export const GetTokenMixed =  TokenService(LoggerMixin(EncryptionService(BaseGateway)));
