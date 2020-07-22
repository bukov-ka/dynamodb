import { MappingItem } from './mapping_item';
import { RunConfig as RunConfig } from '../run_config';

/// Represents configuration of a task set to solve
export class TaskConfig {
  name: string;
  xlsxFile: string;
  tableMapping: MappingItem[];
  schemaPic: string;
  runs: RunConfig[];
  initialJoinSQL: string;
  solutionSQL: string;
  solutionPrimaryKey: string;
  solutionSortKey: string;
}
