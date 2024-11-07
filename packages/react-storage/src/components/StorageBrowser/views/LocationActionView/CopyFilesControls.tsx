import React from 'react';

import { ViewElement } from '../../context/elements';

import { Controls } from '../Controls';

import { Title } from './Controls/Title';
import { displayText } from '../../displayText/en';
import { CLASS_BASE } from '../constants';
import { DestinationPicker } from './DestinationPicker';

import { useCopyView } from './CopyView/useCopyView';
import { DataTableControl } from '../../controls/DataTableControl';
import { ControlsContextProvider } from '../../controls/context';
import { getActionViewTableData } from './utils';
import { useStore } from '../../providers/store';
import { ControlsContext } from '../../controls/types';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { getTasksHaveStarted } from './utils';
import { DescriptionList } from '../../components/DescriptionList';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { ActionCancelControl } from '../../controls/ActionCancelControl';
import { CopyHandlerData } from '../../actions';
import { Breadcrumb } from '../../components/BreadcrumbNavigation';

const { Exit } = Controls;
const { actionDestination } = displayText;

export const CopyFilesControls = ({
  onExit: _onExit,
}: {
  onExit?: () => void;
}): React.JSX.Element => {
  const {
    destinationList,
    onSetDestinationList,
    disableCancel,
    disableClose,
    disablePrimary,
    onExit,
    onActionCancel,
    onActionStart,
    taskCounts,
    tasks,
  } = useCopyView({ onExit: _onExit });

  const [{ location }] = useStore();
  const { current, key } = location;
  const tableData = getActionViewTableData<CopyHandlerData>({
    tasks,
    taskCounts,
    path: key,
  });

  const contextValue: ControlsContext = {
    data: {
      taskCounts,
      tableData,
      actionStartLabel: 'Start',
      isActionStartDisabled: disablePrimary,
      isActionCancelDisabled: disableCancel,
      actionCancelLabel: 'Cancel',
    },
    actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
    onActionStart,
    onActionCancel,
  };
  const hasStarted = getTasksHaveStarted(taskCounts);

  const handleNavigatePath = (index: number) => {
    const newPath = destinationList.slice(0, index + 1);
    onSetDestinationList(newPath);
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <Exit
        onClick={() => {
          onExit(current!);
        }}
        disabled={disableClose}
      />

      <Title />

      <ViewElement className={`amplify-${CLASS_BASE}__table__wrapper`}>
        <DataTableControl className={`amplify-${CLASS_BASE}__table`} />
      </ViewElement>

      {hasStarted ? null : (
        <DestinationPicker
          destinationList={destinationList}
          onSetDestinationList={onSetDestinationList}
        />
      )}

      <ViewElement className={`amplify-${CLASS_BASE}__action__summary`}>
        <ViewElement className={`amplify-${CLASS_BASE}__action-destination`}>
          <DescriptionList
            descriptions={[
              {
                term: `${actionDestination}:`,
                details: destinationList.length ? (
                  <>
                    {destinationList.map((key, index) => (
                      <Breadcrumb
                        isCurrent={index === destinationList.length - 1}
                        key={`${key}-${index}`}
                        // if the copy has started, make the breadcrumbs not navigable any more
                        onNavigate={
                          hasStarted
                            ? undefined
                            : () => handleNavigatePath(index)
                        }
                        // If bucket level access, show bucket name as root breadcrumb
                        name={
                          key === ''
                            ? location.current?.bucket
                            : key.replace('/', '')
                        }
                      />
                    ))}
                  </>
                ) : (
                  '-'
                ),
              },
            ]}
          />
        </ViewElement>
        <StatusDisplayControl
          className={`amplify-${CLASS_BASE}__action__status`}
        />
      </ViewElement>

      <ViewElement className={`amplify-${CLASS_BASE}__action__footer`}>
        <ViewElement className={`amplify-${CLASS_BASE}__action__message`}>
          <ViewElement className={``}>
            Copy action may overwrite existing files at selected destination.
          </ViewElement>
        </ViewElement>
        <ViewElement className={`amplify-${CLASS_BASE}__action__buttons`}>
          <ActionCancelControl
            className={`amplify-${CLASS_BASE}__action__cancel`}
          />
          <ActionStartControl
            className={`amplify-${CLASS_BASE}__action__start`}
          />
        </ViewElement>
      </ViewElement>
    </ControlsContextProvider>
  );
};
