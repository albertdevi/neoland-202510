class Logic {
    constructor() {}

    createIssue(subject, body) {
        if (typeof subject !== 'string') throw new Error('invalid subject type')
        if (subject.length < 1) throw new Error('invalid subject length')
        if (typeof body !== 'string') throw new Error('invalid body type')

        const issue = {
            id: 'issue-115' + data.issuesCount,
            subject: subject,
            body: body,
            status: '🟢 Open',
            date: new Date(),
            author: 'Brandon Sanderson'
        }

        data.insertIssue(issue)
    }

    getAllIssues() {
        return data.getIssues()
    }
}

// instance
const logic = new Logic()