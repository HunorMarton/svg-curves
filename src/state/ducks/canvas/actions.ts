import { action } from 'typesafe-actions';
import { RESIZE } from '../../../constants/actions';

export const resize = ({ width, height }: { width: number; height: number }) =>
  action(RESIZE, { width, height });
