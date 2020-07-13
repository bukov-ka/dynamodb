import { MappingItem } from './mapping_item';
import { GsiConfig } from '../gsi_config';

/// Represents configuration of a task set to solve
export class TaskConfig {
  name: string;
  tableMapping: MappingItem[];
  gsis: GsiConfig[];
}
