import { Box, Stack } from "@mui/material";
import {
  TypographyWithBg,
  ButtonPrimaryRound,
  TypographyPrimary,
  ButtonOutlinedRound,
} from "./themeComponents";

const ConfirmWindowModalContent = ({ onCancel, onConfirm, showConfirmBtn }) => {
  return (
    <div>
      <Box>
        <TypographyWithBg
          sx={{ background: "#fc5555" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Warning
        </TypographyWithBg>
        <Box sx={{ padding: "10px 30px", pb: 0 }}>
          {showConfirmBtn ? (
            <TypographyPrimary
              sx={{ mb: 3, fontSize: 28, textAlign: "center" }}
            >
              Are you sure you want to delete?
            </TypographyPrimary>
          ) : (
            <>
              <TypographyPrimary sx={{ mb: 3 }}>
                To delete this device, you have to unassign livestock first.
              </TypographyPrimary>
              <TypographyPrimary>Steps to Unassign Livestock</TypographyPrimary>
              <Box sx={{ pl: 2 }}>
                <TypographyPrimary>1. Open Device page</TypographyPrimary>
                <TypographyPrimary>2. Click on assign tab</TypographyPrimary>
                <TypographyPrimary>
                  3. Remove assigned livestock
                </TypographyPrimary>
              </Box>
            </>
          )}
        </Box>
        <Stack>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "right",
              p: 2,
            }}
          >
            <ButtonOutlinedRound
              variant="outlined"
              size="large"
              sx={{
                color: "#fc5555",
                borderColor: "#fc5555",
                "&:hover": {
                  borderColor: "#fc5555",
                },
              }}
              onClick={onCancel}
            >
              Cancel
            </ButtonOutlinedRound>
            {showConfirmBtn && (
              <ButtonPrimaryRound
                variant="contained"
                size="large"
                sx={{
                  background: "#fc5555",
                  "&:hover": {
                    background: "#fc5555",
                  },
                }}
                onClick={onConfirm}
              >
                Confirm
              </ButtonPrimaryRound>
            )}
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default ConfirmWindowModalContent;
