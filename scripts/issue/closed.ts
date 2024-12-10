import type { Context } from '@actions/github/lib/context';
import { Octokit } from '@octokit/rest';

declare const context: Context;
declare const github: Octokit;

export default async function() {
    const labels = (await github.rest.issues.listLabelsOnIssue({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
    })).data.map((label) => label.name);

    const statusLabel = labels.find((label) => label.startsWith('Status: ')) as
        | Status
        | undefined;
    if (!statusLabel) {
        throw new Error('Status label not found');
    }

    switch (statusLabel) {
        case Status.Canceled:
        case Status.Inactive_Abandoned:
        case Status.Inactive_Duplicate:
        case Status.Inactive_WontFix:
        case Status.Completed:
            console.log('No action required');
            break;
        case Status.Pending:
        case Status.Available:
            await replaceStatusLabel(statusLabel, Status.Canceled);
            break;
        case Status.InProgress:
            await replaceStatusLabel(statusLabel, Status.Completed);
            break;
    }
}

enum Status {
    Pending = 'Status: Pending',
    Canceled = 'Status: Canceled',
    Available = 'Status: Available',
    Completed = 'Status: Completed',
    InProgress = 'Status: In Progress',
    Inactive_Abandoned = 'Status: Inactive - Abandoned',
    Inactive_Duplicate = 'Status: Inactive - Duplicate',
    Inactive_WontFix = 'Status: Inactive - Won\'t Fix',
}

async function replaceStatusLabel(oldLabel: Status, newLabel: Status) {
    await github.rest.issues.removeLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        name: oldLabel,
    });

    await github.rest.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        labels: [newLabel],
    });
}
