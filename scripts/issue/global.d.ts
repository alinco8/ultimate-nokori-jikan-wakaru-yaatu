import type { Context } from '@actions/github/lib/context';

declare const github: Octokit;
declare const context: Context;

declare type Status =
    | 'Status: Pending'
    | 'Status: Canceled'
    | 'Status: Available'
    | 'Status: Completed'
    | 'Status: In Progress'
    | 'Status: Inactive - Abandoned'
    | 'Status: Inactive - Duplicate'
    | 'Status: Inactive - Won\'t Fix';
