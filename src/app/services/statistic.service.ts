import { dependency } from "@foal/core";
import { TraceRepository } from "../repository/trace.repository";

export class StatisticService {
  @dependency
  private traceRepository: TraceRepository;

  findMostTraced() {
    return this.traceRepository.countAndFindFirstDescByQty();
  }

  findLongestDistance() {
    return this.traceRepository.findFirstDescByDistance();
  }
}
