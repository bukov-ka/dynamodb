import { MappingItem } from './mapping_item';
import { RunConfig as RunConfig } from '../run_config';

/// Represents configuration of a task set to solve
export class TaskConfig {
  name: string;
  tableMapping: MappingItem[];
  runs: RunConfig[];
  initialJoinSQL: string;
  solutionSQL: string;
}
