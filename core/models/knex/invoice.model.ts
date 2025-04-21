import { Invoice } from "../../__domain/entities/invoice.entity"
import { IInvoiceModel } from "../../__domain/models/invoice.model"
import { BaseModel } from "./base"
import { DatabaseException } from "../../exceptions"
import { Tables } from "knex/types/tables"
import { Status } from "core/__domain/interfaces/invoice.interface"

export class InvoiceModel extends BaseModel implements IInvoiceModel {
  async save(entity: Invoice): Promise<void> {
    const [invoice] = await this.knex("invoices")
      .insert({
        id: entity.id,
        account_id: entity.accountId,
        amount: entity.amount,
        status: entity.status,
        description: entity.description,
        payment_type: entity.paymentType,
        created_at: entity.createdAt,
        updated_at: entity.updatedAt,
      })
      .returning("*")

    if (!invoice || invoice.id !== entity.id) {
      throw new DatabaseException("Failure on create invoice")
    }
  }

  async updateStatus(invoice: Invoice): Promise<void> {
    const rowsAffected = await this.knex("invoices")
      .update({
        status: invoice.status,
        updated_at: invoice.updatedAt,
      })
      .where({ id: invoice.id })

    if (rowsAffected <= 0) {
      throw new DatabaseException(
        `Error on update invoice status with id ${invoice.id}`,
      )
    }
  }

  async findById(id: string): Promise<Invoice | null> {
    const invoice = await this.knex("invoices")
      .select("*")
      .where({
        id,
      })
      .first()

    return invoice ? this.toDomain(invoice) : null
  }

  async findByAccountId(accountId: string): Promise<Invoice[]> {
    const invoices = await this.knex("invoices").select("*").where({
      account_id: accountId,
    })

    return invoices.map(this.toDomain)
  }

  async listPendingInvoices(accountId: string): Promise<Invoice[]> {
    const invoices = await this.knex("invoices").select("*").where({
      account_id: accountId,
      status: "pending",
    })

    return invoices.map(this.toDomain)
  }

  private toDomain(invoice: Tables["invoices"]): Invoice {
    return Invoice.create({
      id: invoice.id,
      accountId: invoice.account_id,
      amount: invoice.amount,
      description: invoice.description,
      paymentType: invoice.payment_type,
      status: invoice.status as Status,
      createdAt: invoice.created_at,
      updatedAt: invoice.updated_at,
    })
  }
}
