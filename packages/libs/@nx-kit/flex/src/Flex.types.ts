import { ReactNode } from 'react';
import {
  As,
  FlexContainer,
  Position,
  Color,
  Spacing,
  Layout,
  FlexItem,
  LiteralOrBreakpoints,
  Font,
  Typo,
} from '@nx-kit/styling';

type Styles = Spacing & Position & Color & Layout & Font & Typo;

type FlexType = 'flex' | 'inline-flex' | 'none';

export type FlexProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  elementType?: As;
  styles?: Styles;
  flexType?: FlexType;
  col?: LiteralOrBreakpoints<number>;
  row?: LiteralOrBreakpoints<number>;
  colOffset?: LiteralOrBreakpoints<number>;
} & FlexContainer &
  FlexItem;

export type FlexStyledProps = {
  styles?: Styles;
  flexType?: FlexType;
  col?: any;
  row?: any;
  colOffset?: any;
} & FlexContainer &
  FlexItem;

export type FlexContextGap = LiteralOrBreakpoints<{
  rowGap: string;
  columnGap: string;
}>;

export type Breakpoints = {
  min: number;
  max: number | null;
  breakpoint: string | number;
}[];
