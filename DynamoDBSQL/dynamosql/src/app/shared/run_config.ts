import { RunSolution } from './models/run_solution';

/// Represents configuration of a task for a query run
export class RunConfig {
    name: string;
    description: string;
    solutionKeyValues: RunSolution;    
    result: any[];
  }
  