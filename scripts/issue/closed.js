// @ts-check
/**
 * @typedef {import('./global').Status} Status
 */

/**
 * @param {ReturnType<import("@actions/github/").getOctokit>} github
 * @param {import("@actions/github/lib/context").Context} context
 */
export default async function(github, context) {
    const replaceLabel = replaceStatusLabel.bind(null, github, context);

    const labels = (await github.rest.issues.listLabelsOnIssue({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
    })).data.map((label) => label.name);

    const statusLabel =
        /** @type {Status|undefined} */ (labels.find((label) =>
            label.startsWith('Status: ')
        ));
    if (!statusLabel) {
        throw new Error('Status label not found');
    }

    switch (statusLabel) {
        case 'Status: Canceled':
        case 'Status: Inactive - Abandoned':
        case 'Status: Inactive - Duplicate':
        case 'Status: Inactive - Won\'t Fix':
        case 'Status: Completed':
            console.log('No action required');
            break;
        case 'Status: Pending':
        case 'Status: Available':
            await replaceLabel(statusLabel, 'Status: Canceled');
            break;
        case 'Status: In Progress':
            await replaceLabel(statusLabel, 'Status: Completed');
            break;
    }
}

/**
 * @param {ReturnType<import("@actions/github/").getOctokit>} github
 * @param {import("@actions/github/lib/context").Context} context
 * @param {Status} oldLabel
 * @param {Status} newLabel
 */
async function replaceStatusLabel(github, context, oldLabel, newLabel) {
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
