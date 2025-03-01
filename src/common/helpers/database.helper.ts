import {
    QueryFailedError,
    EntityNotFoundError,
    CannotCreateEntityIdMapError,
    CannotExecuteNotConnectedError,
    CannotReflectMethodParameterTypeError,
    DriverPackageNotInstalledError,
    EntityMetadataNotFoundError,
    OptimisticLockCanNotBeUsedError,
    CustomRepositoryNotFoundError,
    TransactionAlreadyStartedError,
    TransactionNotStartedError,
} from 'typeorm';

export const isDatabaseError = (error: any): boolean => {
    if (
        error instanceof QueryFailedError ||
        error instanceof EntityNotFoundError ||
        error instanceof CannotCreateEntityIdMapError ||
        error instanceof CannotExecuteNotConnectedError ||
        error instanceof CannotReflectMethodParameterTypeError ||
        error instanceof DriverPackageNotInstalledError ||
        error instanceof EntityMetadataNotFoundError ||
        error instanceof CustomRepositoryNotFoundError ||
        error instanceof OptimisticLockCanNotBeUsedError ||
        error instanceof TransactionAlreadyStartedError ||
        error instanceof TransactionNotStartedError
    ) {
        return true;
    }

    return false;
};
