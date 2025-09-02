import * as S from "./Selector.styled";

type SelectorParams = {
  array: { id: string | number; name: string; disabled?: boolean }[];
  selectedItem?: { id: string | number; name: string };
  onChange: (arg0: any) => void;
  mode: "button" | "image";
};

/** Кастомный селектор
 *
 * @param array Массив по которому происходит выбор
 * @param selectedItem Выбранный лемент массива
 * @param onChange Функция выбора элемента
 * @mode Режим отображения: кнопки или картинки
 *
 */
export const Selector = ({
  array,
  selectedItem,
  onChange,
  mode,
}: SelectorParams) => {
  return (
    <S.Selector>
      {mode === "button" &&
        array.map((item) => (
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
      {mode === "image" &&
        array.map((image) => {
          return (
            <S.SelectImage
              src={image.name}
              selected={selectedItem?.id === image.id}
              onClick={() => onChange(image.name)}
            />
          );
        })}
    </S.Selector>
  );
};
