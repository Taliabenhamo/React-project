interface Props {
    mainText: string;
    subText?: string;
}

function Title({ mainText, subText }: Props) {
    return (
        <h1 className="text-center mb-4 mt-4">
          {mainText}<br />
          {subText && (
            <small className="text">
              {subText}
            </small>
          )}
        </h1>
      );
    }

export default Title;
