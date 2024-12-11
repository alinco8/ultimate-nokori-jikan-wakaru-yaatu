/**
 * @typedef {import('./global').Status} Status
 */

export default async function() {
    const labels = (await github.rest.issues.listLabelsOnIssue({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
    })).data.map((label) => label.name);

    /**
     * @type {Status}
     */
    const statusLabel = labels.find((label) => label.startsWith('Status: '));
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

/**
 * @param {Status} oldLabel
 * @param {Status} newLabel
 */
async function replaceStatusLabel(oldLabel, newLabel) {
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
