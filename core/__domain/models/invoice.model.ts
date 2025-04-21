import { Invoice } from "../entities/invoice.entity"
import { IBaseModel } from "./base.model"

export interface IInvoiceModel
  extends Pick<IBaseModel<Invoice>, "save" | "findById"> {
  findByAccountId(accountId: string): Promise<Invoice[]>
  updateStatus(invoice: Invoice): Promise<void>
  listPendingInvoices(accountId: string): Promise<Invoice[]>
}
