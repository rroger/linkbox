# frozen_string_literal: true

unless gitlab.mr_body =~ %r{/issues/\d+} || gitlab.mr_body =~ /#\d+/
  warn <<~TEXT.delete(/\$/)
    This merge request does not reference any issues. Please add an \
    issue reference to the Description.
  TEXT
end

if git.commits.any? { |commit| commit.message =~ /^Merge branch 'master'/ }
  warn 'Please rebase to get rid of the merge commits in this PR'
end

if git.commits.any? { |commit| commit.message.split(/\n/).first.length > 50 }
  warn <<~TEXT.delete(/\$/)
    On of your commit messages is too long. Please adhere to the following \
    basic structural rules for creating a meaningful commit message:

    * Keep the first line of your commit message short (not more than 50 chars). \
      Many tools such as Github and graphical git clients strip the subject after \
      50 characters, and people working on the command line are better off with \
      text which is not too wide.
    * Keep the second line empty
    * Use the rest of the commit message to describe the commit. There’s no \
      restriction on the format nor the length, so be as descriptive and \
      informative as possible.
  TEXT
end

if git.commits.any? { |commit| commit.message =~ /WIP/ }
  warn 'One of your commits is a WIP commit. Please cleanup your git history.'
end
