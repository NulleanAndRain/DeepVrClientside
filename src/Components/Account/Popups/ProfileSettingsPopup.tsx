import { PopupLayout } from "./PopupLayout";
import { useAppSelector } from "../../../Utils/redux/store";
import { getUser } from "../../../Utils/redux/authSlice";
import { useForm } from "react-hook-form";
import { FormField } from "../../Common/FormFields/FormField";
import { IChangePassForm, IEditProfileForm } from "../../../Utils/types";

import userIcon from "../../../Assets/user-icon-liliac.svg";

import "../AccountStyles.css";
import { EmailField } from "../../Common/FormFields/EmailField";
import { PhoneInput } from "../../Common/FormFields/PhoneField";
import { NextButton } from "../../Common/Markup/NextButton";
import { useState } from "react";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";
import { PassField } from "../../Common/FormFields/PassField";
import { FormError } from "../../Common/FormFields/FormError";

interface Props {
  onBackClick: () => void;
}

export const ProfileSettingsPopup: React.FC<Props> = ({ onBackClick }) => {
  const user = useAppSelector(getUser);
  const {
    control: controlEdit,
    getValues: getValuesEdit,
    formState: { errors: errorsEdit, isValid: isValidEdit },
  } = useForm<IEditProfileForm>({
    mode: "onTouched",
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    },
  });

  const {
    control: controlPass,
    getValues: getValuesPass,
    formState: { errors: errorsPass, isValid: isValidPass },
  } = useForm<IChangePassForm>({
    mode: "onTouched",
  });

  const values = getValuesEdit();
  const canUpdateProfile =
    isValidEdit &&
    (values.email !== user?.email ||
      values.name !== user.name ||
      values.phone !== user.phone);

  const onSubmitEdit = () => {
    setIsLoadingEditProfile(true);
    setErrorEdit(undefined);
    if (canUpdateProfile) {
      // api call
      console.log("updating profile");
      setIsLoadingEditProfile(false);
    }
  };

  const onSubmitPass = () => {
    setIsLoadingChangePass(true);
    setErrorPass(undefined);
    if (isValidPass) {
      // api call
      console.log("updating pass");
      setIsLoadingChangePass(false);
    }
  };

  const [errorEdit, setErrorEdit] = useState<string | undefined>();
  const [errorPass, setErrorPass] = useState<string | undefined>();

  const [isLoadingEditProfile, setIsLoadingEditProfile] = useState(false);
  const [isLoadingChangePass, setIsLoadingChangePass] = useState(false);

  return (
    <PopupLayout title="Настройки профиля" onBackClick={onBackClick}>
      <div className="profile-settings-forms-wrapper">
        <form className="login-form">
          <FormField
            control={controlEdit}
            error={errorsEdit.name}
            type="text"
            icon={userIcon}
            name="name"
            autocomplete="name"
            required="Введите ваше имя"
            minLength={{
              value: 2,
              message: "Имя должно содержать не меньше 2 символов",
            }}
          />
          <EmailField
            control={controlEdit}
            error={errorsEdit.email}
            autocomplete="email"
            required
          />
          <PhoneInput
            control={controlEdit}
            error={errorsEdit.phone}
            autocomplete="tel"
            required
          />
          <FormError errorMsg={errorEdit} />
          <NextButton isActive={canUpdateProfile} onClick={onSubmitEdit}>
            Изменить профиль
          </NextButton>
          <LoadWrapper isLoading={isLoadingEditProfile} height={1} />
        </form>
        <form className="login-form">
          <PassField
            name="password"
            control={controlPass}
            error={errorsPass.password}
            autocomplete="password"
            requred="Введите пароль"
            placeholder="Пароль"
          />
          <PassField
            name="newPassword"
            control={controlPass}
            error={errorsPass.newPassword}
            autocomplete="password-new"
            requred="Введите новый пароль"
            placeholder="Новый пароль"
            validate={{
              matchPass: (value) =>
                value !== getValuesPass().password ||
                "Новый и старый пароли не должны совпадать",
            }}
          />
          <PassField
            name="newPasswordConfirm"
            control={controlPass}
            error={errorsPass.newPasswordConfirm}
            autocomplete="password-new"
            placeholder="Подтверждение пароля"
            validate={{
              matchPass: (value) =>
                value === getValuesPass().newPassword ||
                "Пароли должны совпадать",
            }}
          />
          <FormError errorMsg={errorPass} />
          <NextButton isActive={isValidPass} onClick={onSubmitPass}>
            Изменить пароль
          </NextButton>
          <LoadWrapper isLoading={isLoadingChangePass} height={1} />
        </form>
      </div>
    </PopupLayout>
  );
};
