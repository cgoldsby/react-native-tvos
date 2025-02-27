/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.modules.dialog;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.res.TypedArray;
import android.os.Bundle;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.DialogFragment;
import com.facebook.infer.annotation.Nullsafe;

/** A fragment used to display the dialog. */
@Nullsafe(Nullsafe.Mode.LOCAL)
public class AlertFragment extends DialogFragment implements DialogInterface.OnClickListener {

  /* package */ static final String ARG_TITLE = "title";
  /* package */ static final String ARG_MESSAGE = "message";
  /* package */ static final String ARG_BUTTON_POSITIVE = "button_positive";
  /* package */ static final String ARG_BUTTON_NEGATIVE = "button_negative";
  /* package */ static final String ARG_BUTTON_NEUTRAL = "button_neutral";
  /* package */ static final String ARG_ITEMS = "items";

  private final @Nullable DialogModule.AlertFragmentListener mListener;

  public AlertFragment() {
    mListener = null;
  }

  @SuppressLint("ValidFragment")
  public AlertFragment(@Nullable DialogModule.AlertFragmentListener listener, Bundle arguments) {
    mListener = listener;
    setArguments(arguments);
  }

  public static Dialog createDialog(
      Context activityContext, Bundle arguments, DialogInterface.OnClickListener fragment) {
    if (isAppCompatTheme(activityContext)) {
      return createAppCompatDialog(activityContext, arguments, fragment);
    } else {
      return createAppDialog(activityContext, arguments, fragment);
    }
  }

  /**
   * Checks if the current activity is a descendant of an AppCompat theme. This check is required to
   * safely display an AppCompat dialog. If the current activity is not a descendant of an AppCompat
   * theme and we attempt to render an AppCompat dialog, this will cause a crash.
   *
   * @returns true if the current activity is a descendant of an AppCompat theme.
   */
  private static boolean isAppCompatTheme(Context activityContext) {
    TypedArray attributes =
        activityContext.obtainStyledAttributes(androidx.appcompat.R.styleable.AppCompatTheme);
    boolean isAppCompat =
        attributes.hasValue(androidx.appcompat.R.styleable.AppCompatTheme_windowActionBar);
    attributes.recycle();
    return isAppCompat;
  }

  /**
   * Creates a dialog compatible only with AppCompat activities. This function should be kept in
   * sync with {@link createAppDialog}.
   */
  private static Dialog createAppCompatDialog(
      Context activityContext, Bundle arguments, DialogInterface.OnClickListener fragment) {
    AlertDialog.Builder builder =
        new AlertDialog.Builder(activityContext).setTitle(arguments.getString(ARG_TITLE));

    if (arguments.containsKey(ARG_BUTTON_POSITIVE)) {
      builder.setPositiveButton(arguments.getString(ARG_BUTTON_POSITIVE), fragment);
    }
    if (arguments.containsKey(ARG_BUTTON_NEGATIVE)) {
      builder.setNegativeButton(arguments.getString(ARG_BUTTON_NEGATIVE), fragment);
    }
    if (arguments.containsKey(ARG_BUTTON_NEUTRAL)) {
      builder.setNeutralButton(arguments.getString(ARG_BUTTON_NEUTRAL), fragment);
    }
    // if both message and items are set, Android will only show the message
    // and ignore the items argument entirely
    if (arguments.containsKey(ARG_MESSAGE)) {
      builder.setMessage(arguments.getString(ARG_MESSAGE));
    }
    if (arguments.containsKey(ARG_ITEMS)) {
      builder.setItems(arguments.getCharSequenceArray(ARG_ITEMS), fragment);
    }

    return builder.create();
  }

  /**
   * Creates a dialog compatible with non-AppCompat activities. This function should be kept in sync
   * with {@link createAppCompatDialog}.
   *
   * @deprecated non-AppCompat dialogs are deprecated and will be removed in a future version.
   */
  @Deprecated(since = "0.75.0", forRemoval = true)
  private static Dialog createAppDialog(
      Context activityContext, Bundle arguments, DialogInterface.OnClickListener fragment) {
    android.app.AlertDialog.Builder builder =
        new android.app.AlertDialog.Builder(activityContext)
            .setTitle(arguments.getString(ARG_TITLE));

    if (arguments.containsKey(ARG_BUTTON_POSITIVE)) {
      builder.setPositiveButton(arguments.getString(ARG_BUTTON_POSITIVE), fragment);
    }
    if (arguments.containsKey(ARG_BUTTON_NEGATIVE)) {
      builder.setNegativeButton(arguments.getString(ARG_BUTTON_NEGATIVE), fragment);
    }
    if (arguments.containsKey(ARG_BUTTON_NEUTRAL)) {
      builder.setNeutralButton(arguments.getString(ARG_BUTTON_NEUTRAL), fragment);
    }
    // if both message and items are set, Android will only show the message
    // and ignore the items argument entirely
    if (arguments.containsKey(ARG_MESSAGE)) {
      builder.setMessage(arguments.getString(ARG_MESSAGE));
    }
    if (arguments.containsKey(ARG_ITEMS)) {
      builder.setItems(arguments.getCharSequenceArray(ARG_ITEMS), fragment);
    }

    return builder.create();
  }

  @Override
  public Dialog onCreateDialog(Bundle savedInstanceState) {
    return createDialog(requireActivity(), requireArguments(), this);
  }

  @Override
  public void onClick(DialogInterface dialog, int which) {
    if (mListener != null) {
      mListener.onClick(dialog, which);
    }
  }

  @Override
  public void onDismiss(DialogInterface dialog) {
    super.onDismiss(dialog);
    if (mListener != null) {
      mListener.onDismiss(dialog);
    }
  }
}
