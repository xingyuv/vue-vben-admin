import { isString } from 'lodash-es';
import type { FunctionalComponent, VNode } from 'vue';
import { h } from 'vue';

import Icon from '@/components/Icon/Icon.vue';

export const TreeIcon: FunctionalComponent = ({ icon }: { icon: VNode | string }) => {
  if (!icon) return null;
  if (isString(icon)) {
    return h(Icon, { icon, class: 'mr-1' });
  }
  return Icon;
};
