import { useTableCell } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import React, { useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { TableCellProps } from '../Table.types';

export const TableCell = ({ cell, state }: TableCellProps) => {
  const ref = useRef(null);

  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      className={isFocusVisible ? 'isFocused' : undefined}
      ref={ref}
    >
      {cell.rendered}
    </td>
  );
};
