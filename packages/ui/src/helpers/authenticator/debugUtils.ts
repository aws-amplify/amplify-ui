import { groupLog } from '../../utils';
import { GetRoute } from './getRoute';

/**
 * @internal Not to be used in production
 * @description Debugging tool for logging `state` and `actorState`
 *
 * @example
 * ```ts
 * const getRouteWithLogs = logRouteChanges(getRoute);
 * ```
 */
export const logRouteChanges = (fn: GetRoute): GetRoute => {
  let prevStateValue;
  let prevActorStateValue;
  return (state, actorState) => {
    const stateValue = state?.value ? JSON.stringify(state.value) : undefined;
    const actorStateValue = actorState?.value
      ? JSON.stringify(actorState.value)
      : undefined;

    const bothUpdated =
      stateValue !== prevStateValue && actorStateValue !== prevActorStateValue;

    const logValues = (label) =>
      groupLog(
        label,
        { 'state.value': state?.value },
        { 'actorState.value': actorState?.value }
      );

    if (bothUpdated) {
      prevStateValue = stateValue;
      prevActorStateValue = actorStateValue;
      logValues('state and actorState value updated');
    }

    if (!bothUpdated && stateValue !== prevStateValue) {
      prevStateValue = stateValue;
      logValues('state value updated');
    }

    if (!bothUpdated && actorStateValue !== prevActorStateValue) {
      prevActorStateValue = actorStateValue;
      logValues('actor state value updated');
    }

    return fn(state, actorState);
  };
};
