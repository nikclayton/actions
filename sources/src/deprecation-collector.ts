import * as core from '@actions/core'
import * as github from '@actions/github'

const recordedDeprecations: string[] = []

export function recordDeprecation(message: string): void {
    recordedDeprecations.push(message)
}

export function getDeprecationMessages(): string[] {
    return recordedDeprecations
}

export function maybeEmitDeprecationWarning(): void {
    if (recordedDeprecations.length > 0) {
        core.warning(
            `The Job ${github.context.job} uses deprecated functionality. Consult the Job Summary for more details.`
        )
    }
}

export function saveState(): void {
    core.saveState('deprecations', JSON.stringify(recordedDeprecations))
}

export function restoreState(): void {
    const stringRep = core.getState('deprecations')
    recordedDeprecations.push(...JSON.parse(stringRep))
}
