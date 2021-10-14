import {EntityRepository, Repository} from "typeorm";
import { OrderHistory } from "./order-history.entity";

@EntityRepository(OrderHistory)
export class OrderHistoryRepository extends Repository<OrderHistory> {

}