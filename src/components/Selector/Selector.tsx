import * as S from "./Selector.styled";

type SelectorParams = {
  array: { id: string | number; name: string; disabled?: boolean }[];
  selectedItem?: { id: string | number; name: string };
  onChange: (arg0: any) => void;
};

/** Кастомный селектор
 *
 * @param array Массив по которому происходит выбор
 * @param selectedItem Выбранный лемент массива
 * @param onChange Функция выбора элемента
 *
 */
export const Selector = ({ array, selectedItem, onChange }: SelectorParams) => {
  return (
    <S.Selector>
      {array.map((item) => (
        <S.SelectButton
          size="xl"
          selected={selectedItem?.id === item.id}
          disabled={item.disabled || false}
          key={JSON.stringify(item)}
          onClick={() => {
            onChange(item);
          }}
        >
          {item.name}
        </S.SelectButton>
      ))}
    </S.Selector>
  );
};
