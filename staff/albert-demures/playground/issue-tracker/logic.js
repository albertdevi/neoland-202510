class Logic {
    constructor() { }

    createIssue(subject, body) {
        if (typeof subject !== 'string') throw new Error('invalid subject type')
        if (subject.length < 1) throw new Error('invalid subject length')
        if (typeof body !== 'string') throw new Error('invalid body type')

        const issue = {
            id: 'Issue-115' + data.issuesCount,
            subject: subject,
            body: body,
            status: 'Open',
            date: new Date(),
            author: 'Albert Demures'
        }
        data.insertIssue(issue)
    }

    getAllIssues() {
        return data.getIssues()
    }

    setIssueStatus(issueId, newStatus) {
        if (typeof issueId !== 'string') throw new Error('invalid issue id')
        if (typeof newStatus !== 'string') throw new Error('invalid status')
        const issues = data.getIssues()

        for (let i = 0; i < issues.length; i++) {
            if (issues[i].id === issueId) {
                issues[i].status = newStatus
                return
            }
        }
    }
}

// instance
const logic = new Logic()