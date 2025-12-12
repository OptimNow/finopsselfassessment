# Merge conflict quick guide

This project follows a light, helper-text-free questionnaire design. When resolving merge conflicts in the GitHub UI:

1. **Pick the incoming change** when you see the conflict in `src/components/QuestionCard.tsx` that contains the helper text:
   ```
   <div className="text-xs text-muted-foreground text-right">
     Auto-advances on selection
   </div>
   <div className="font-semibold text-primary">Back enabled</div>
   ```
   Keep the version **without** this helper copy. Selecting **"Accept incoming change"** matches the approved design.

2. After accepting the incoming change, ensure the footer logo and light background remain intact. No additional edits are required for this conflict.

3. If other conflicts appear, prefer the variant that keeps the light background, the footer logo, and removes the questionnaire helper copy.

For local resolution instead of the web UI:
- Check conflict markers with `git status` and edit the files to remove the helper text, then stage with `git add` and commit.

## If the PR UI shows “Les fichiers binaires ne sont pas pris en charge”
- This warning appears because the logo and favicon are image binaries; it does **not** block the merge.
- To proceed in GitHub:
  1. Ignore the binary diff preview and click **Create pull request** anyway—the files stay attached even if the UI cannot show their diff.
  2. If the button is disabled, switch to the **Files changed** tab, collapse the binary file rows, and try again.
- To bypass the web UI entirely, open a terminal and push your branch normally, then run:
  ```bash
  git push origin <branch-name>
  # Then open GitHub and click "Compare & pull request" on the banner.
  ```
